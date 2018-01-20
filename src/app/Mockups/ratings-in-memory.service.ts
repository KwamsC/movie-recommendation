import { InMemoryDbService } from 'angular-in-memory-web-api';

export class RatingsInMemoryService implements InMemoryDbService {
  createDb() {
    const ratings = [
      { id: 1, comment: 'sample comment 1', score: '1', timestamp: 1},
      { id: 2, comment: 'sample comment 2', score: '2', timestamp: 2},
      { id: 3, comment: 'sample comment 3', score: '3', timestamp: 3}
    ];

    return {ratings};
  }

}
