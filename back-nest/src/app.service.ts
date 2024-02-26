import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

 interface Test {
  id : number;
  text : string;
}

@Injectable()
export class AppService {

  constructor(private prismaService: PrismaService) {}

  getHello(): string {
    return 'This is a test !';
  }

  async addTest(test: string) {
    const newTest = await this.prismaService.tester.create({
      data : {
        text: test,
    }
    })
  }

  async getTest() {
    const test = await this.prismaService.tester.findMany( {
    })
    return test;
  }
}
