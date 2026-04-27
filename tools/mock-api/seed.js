const { faker } = require('@faker-js/faker');
const fs = require('fs');

const projects = [];
const metrics = [];

for (let i = 1; i <= 5; i++) {
  projects.push({
    id: i,
    name: faker.company.name(),
  });
}

let idCounter = 1;

for (let projectId = 1; projectId <= 5; projectId++) {
  for (let d = 0; d < 100; d++) {
    const date = faker.date.past(1);

    metrics.push({
      id: idCounter++,
      projectId,
      date: date.toISOString().split('T')[0],
      revenue: faker.number.int({ min: 5000, max: 50000 }),
      cost: faker.number.int({ min: 2000, max: 30000 }),
      users: faker.number.int({ min: 50, max: 2000 }),
      conversionRate: faker.number.float({ min: 0.01, max: 0.1 }),
    });
  }
}

fs.writeFileSync('db.json', JSON.stringify({ projects, metrics }, null, 2));

console.log('db.json generated');
