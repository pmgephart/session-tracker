import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
	{
		email: "pmgephart@gmail.com",
		firstName: "Patrick",
		lastName: "Gephart",
		password: "Test123"
	}
];

const activities = [
	{
		name: "Weighted Hangboarding"
	},
	{
		name: "Weighted Pull Up"
	},
	{
		name: "Glute Bridge"
	},
	{
		name: "Jack Knife to Isometric"
	},
	{
		name: "Dish Tuck"
	},
	{
		name: "Push Up"
	},
	{
		name: "Hip Flexor Raise"
	},
	{
		name: "Weighted Squat"
	},
	{
		name: "RDL"
	},
	{
		name: "Single Leg RDL"
	},
	{
		name: "Weighted Abductor Opener"
	},
	{
		name: "Weighted Butterfly"
	},
	{
		name: "General Stretching"
	},
	{
		name: "Face Pull to Press Up"
	},
	{
		name: "Sport Climbing"
	},
	{
		name: "Outside Sport Climbing"
	},
	{
		name: "Outside Trad Climbing"
	},
	{
		name: "Gym Bouldering"
	},
	{
		name: "Tension Board Bouldering"
	},
	{
		name: "Moonboard Bouldering"
	}
];

const sessions = [
	{
		name: "Movement gym session",
		description: "Hangboard, mobility, weighted pull-ups",
		date: new Date(2024, 12, 23),
		workouts: {
			create: [
				{
					workout: {
						create: {
							description: "Completed all sets and felt strong. 15/20/25/25/25/25",
							sets: 6,
							weight: 25,
							activity: {
								connect: {
									id: 1
								}
							}
						}
						
					}
				},
				{
					workout: {
						create: {
							description: "RDL with warm up set 1",
							sets: 4,
							weight: 115,
							activity: {
								connect: {
									id: 9
								}
							}
						}
					}
				}
			]
		},
		user: {
			connect: {
				id: 1
			}
		}
	},
	/*
	{
		name: "Movement bouldering session",
		description: "Hangboard warm up then tension board climbing up to V4 @40 degrees",
		date: new Date(2025, 1, 12),
		workouts: {
			create: [
				{
					description: "completed up to 40 degrees V4",
					duration: 2,
					activity: {
						connect: {
							id: 19
						}
					}
				}
			]
		},
		user: {
			connect: {
				id: 1
			}
		}
	},
	{
		name: "Movement sport climbing session",
		description: "Hangboard warm up then sport climbing up to 5.12-",
		date: new Date(2025, 1, 14),
		workouts: {
			create: [
				{
					description: "sent one 5.21-",
					duration: 3,
					activity: {
						connect: {
							id: 15
						}
					}
				}
			]
		},
		user: {
			connect: {
				id: 1
			}
		}
	}
	*/
];

async function seedData() {
	console.log("Seeding Session Tracker database...\n");

	/** users create

	await prisma.user.deleteMany();

	for(const user of users) {
		const result = await prisma.user.create({ data: user });

		console.log(`Created user with id: ${result.id}`);
	}

	**/

	/** activities create

	await prisma.activity.deleteMany();

	for(const activity of activities) {
		const result = await prisma.activity.create({ data: activity });

		console.log(`Created activity with id: ${result.id}`);
	}

	**/

	const currentActivities = await prisma.activity.findMany();

	console.log(currentActivities);

	await prisma.session.deleteMany();

	for(const session of sessions) {
		console.log(session);

		const result = await prisma.session.create({ data: session });

		console.log(`Created session with id: ${result.id}`);
	}

	console.log("\nFinished seeding Session Tracker database.");
}

seedData()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
