import { Controller, Get, Param, Render } from '@nestjs/common';


@Controller()
export class ViewController {

    @Get()
    @Render('index')
    home(){
      return {data:null}
    }

    @Get('/success/:id')
    @Render('index')
    homeSuccess(@Param('id') id:string){
      return {data:id}
    }


    @Get("/checkout/:itemId")
    @Render('checkout')
    async findOne(@Param('itemId') item_id: string) {
      return {};
    }
}
