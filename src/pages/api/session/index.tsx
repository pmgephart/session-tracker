import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/db';
import { user } from "@/util/user";

type ResponseData = {
	session: {}
}

export default async function handler (
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
    const userSession = getUserSession(req, res);

	if(req.method === "GET") {
		try {
			const id = parseInt(req.query.id);

			if(!id) {
				throw "Session ID is missing";
			}

			const session = await prisma.session.findUnique({
				where: {
					id: id
				},
				include: {
					workouts: {
						include: {
							activity: true
						}
					}
				}
			});

			return res.status(200).json({
				session: session
			});
		}
		catch(error) {
			res.status(400).json({
				session: null
			});
		}
	}

	if(req.method === "PUT") {
		try {
			const session = JSON.parse(req.body);
			const id = parseInt(session.id);

			if(!id) {
				throw "Session ID is missing";
			}

			const updateSession = await prisma.session.update({
				where: {
					id: id
				},
				data: {
					name: session.name,
					description: session.description,
					date: session.date,
				}
			});

			if(session.workouts.length) {
				const processWorkouts = session.workouts.map(async (workout) => {
					if(workout.id) {
						const updateWorkout = await prisma.workout.update({
							where: {
								id: workout.id
							},
							data: {
								description: workout.description,
								sets: parseInt(workout.sets),
								reps: parseInt(workout.reps),
								weight: parseInt(workout.weight),
								duration: workout.duration,
								activity: {
									connect: {
										id: workout.activityId
									}
								}
							}
						});

						return;
					}

					const createWorkout = await prisma.workout.create({
						data: {
							description: workout.description,
							sets: parseInt(workout.sets),
							reps: parseInt(workout.reps),
							weight: parseInt(workout.weight),
							duration: workout.duration,
							activity: {
								connect: {
									id: workout.activityId
								}
							},
							session: {
								connect: {
									id: session.id
								}
							}
						}
					});
				});

				const processAllWorkouts = await Promise.all(processWorkouts);
			}

			res.status(200).json({
				session: updateSession
			});
		}
		catch(error) {
			console.log(error);

			res.status(400).json({
				session: null
			});
		}
	}

    if(req.method === "POST") {
        let errors: string[] = [];

        try {
            const session = JSON.parse(req.body);

            console.log(session);

            if(session.id) {
                throw "This session already exists"; 
            }

            if(date === '') {
                errors.push({
                    field: "date",
                    error: "Date is a required field"
                });
            }

            if(name === '') {
                errors.push({
                    field: "name",
                    error: "Name is a required field"
                });
            }

            //const result = await prisma.activity.create({ data: activity });

            res.status(200).json({
                made: "made it"
            });
        }
        catch(error) {
            res.status(400).json({
                error
            });
        }
    }
}