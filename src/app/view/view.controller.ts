import { Controller, Get, Param, Render } from '@nestjs/common';
import { ItemsService } from '../items/items.service';

@Controller()
export class ViewController {
  constructor(private readonly itemsService: ItemsService){}

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
    async checkout(@Param('itemId') item_id: string) {
      const item = await this.itemsService.findOne(item_id);
      return { item }
    };
}

