const prisma = require("../prisma");

const seed = async () => {
  await prisma.player.createMany({
    data: [
      { name: "Buddy", breed: "Golden Retriever", imageUrl: "https://example.com/buddy.jpg" },
      { name: "Max", breed: "Labrador Retriever", imageUrl: "https://example.com/max.jpg" },
      { name: "Charlie", breed: "Beagle", imageUrl: "https://example.com/charlie.jpg" },
      { name: "Cooper", breed: "German Shepherd", imageUrl: "https://example.com/cooper.jpg" },
      { name: "Rocky", breed: "Bulldog", imageUrl: "https://example.com/rocky.jpg" },
      { name: "Milo", breed: "Poodle", imageUrl: "https://example.com/milo.jpg" },
      { name: "Bear", breed: "Boxer", imageUrl: "https://example.com/bear.jpg" },
      { name: "Tucker", breed: "Rottweiler", imageUrl: "https://example.com/tucker.jpg" },
      { name: "Duke", breed: "Dachshund", imageUrl: "https://example.com/duke.jpg" },
      { name: "Oliver", breed: "Shih Tzu", imageUrl: "https://example.com/oliver.jpg" },
    ],
  });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });