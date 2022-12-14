import {Request, Response} from 'express';
import Product from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const total = await Product.countDocuments().exec();
        const per = req.query.per ? Number(req.query.per) : 5
        const skip = per * (Number(req.query.page) - 1);
        const title = req.query.search ?  req.query.search as string : ''
        try {
            const products = await Product.find({title: new RegExp(title, "gi")})
                .limit(100)
                .skip(skip)
                .exec();
    
            res.status(200)
                .json({products, total});
    
        } catch (e) {
            res.status(500).json({
                error: 'some error: ' + e.message,
                info: 'Back doesn\'t know what the error is...',
                errorObject: {...e},
                in: 'getProduct/Product.find',
            });
        }
    } catch(e) {
        res.status(500).json({
            error: 'some error: ' + e.message,
            info: 'Back doesn\'t know what the error is...',
            errorObject: {...e},
            in: 'getProduct/countDocuments',
        });
    }
  
};

// Имя Описание
// $eq Соответствует значениям, которые равны указанному значению.
// $gt Соответствует значениям, которые больше указанного значения.
// $gte Соответствует значениям, которые больше или равны указанному значению.
// $in Соответствует любому из значений, указанных в массиве.
// $lt Соответствует значениям, которые меньше указанного значения.
// $lte Соответствует значениям, которые меньше или равны указанному значению.
// $ne Соответствует всем значениям, которые не равны указанному значению.
// $nin Не соответствует ни одному из значений, указанных в массиве.

// $and Объединяет предложения запроса с логическим И возвращает все документы, которые соответствуют условиям обоих предложений.
// $not Инвертирует эффект выражения запроса и возвращает документы, которые не соответствуют выражению запроса.
// $nor Объединяет предложения запроса с логическим NOR и возвращает все документы, которые не соответствуют обоим предложениям.
// $or Объединяет предложения запроса с логическим ИЛИ возвращает все документы, которые соответствуют условиям любого из предложений.

// $exists Соответствует документам с указанным полем.
// $type Выбирает документы, если поле имеет указанный тип.

// $expr Позволяет использовать выражения агрегации на языке запросов.
// $jsonSchema Проверять документы на соответствие данной JSON-схеме.
// $mod Выполняет операцию по модулю над значением поля и выбирает документы с указанным результатом.
// $regex Выбирает документы, значения которых соответствуют заданному регулярному выражению.
// $text Выполняет текстовый поиск.
// $where Соответствует документам, которые удовлетворяют выражению JavaScript.
