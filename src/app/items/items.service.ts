import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
    findOne(item_id: string) {
        const data = [
            {
                "id": 0,
                "name": "Simple Couch",
                "value":   300
            },
            {
                "id": 1,
                "name": "Classy Couch",
                "value":   500
            },
            {
                "id": 2,
                "name": "Comfy Couch",
                "value":    500
            },
            {
                "id": 3,
                "name": "Garden Couch",
                "value":   400
            },
            {
                "id": 4,
                "name": "Family Couch",
                "value":   800
            },
            {
                "id": 5,
                "name": "Executive Couch",
                "value":  900
            }
        ];
        return data[item_id];
    }
  
}
