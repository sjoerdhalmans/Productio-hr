import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection, Repository } from 'typeorm';


describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, Repository],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('findAll', () => {

    it('should return an array of users', async () => {
      expect(await (await appController.getAll()).length).toBeGreaterThan(0);
    })
  })
});
