import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/db';
import { getUserSession } from "@/util/user";

type ResponseData = {
	session: {}
}

export default async function handler (
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
    const userSession = await getUserSession(req, res);

    if(!userSession) {
        res.status(400).json({
            message: "Invalid request",
            errors: []
        });
    }

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

            if(session.id) {
                throw "This session already exists"; 
            }

            if(session.date === '') {
                errors.push({
                    field: "date",
                    error: "Date is a required field"
                });
            }

            if(session.name === '') {
                errors.push({
                    field: "name",
                    error: "Name is a required field"
                });
            }

            if(errors.length) {
                throw new AggregateError(errors, "The following errors occurred while processing your session");
            }

            //const result = await prisma.activity.create({ data: activity });

            res.status(200).json({
                made: "made it"
            });
        }
        catch(error) {
            if(error instanceof AggregateError) {
                res.status(400).json({
                    message: error.message,
                    errors: error.errors
                });
            }

            res.status(400).json({
                message: "An error occurred while processing your session",
                errors: []
            });
        }
    }
}