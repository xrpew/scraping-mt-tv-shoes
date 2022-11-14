import {chromium} from 'playwright'

const shops= [
    {
    product:"4 MOTO",
    url:'https://moto.mercadolibre.cl/MLC-1084693867-cuatrimoto-highper-modelo-thunder-125cc-automatica-full-_JM#position=2&search_layout=grid&type=item&tracking_id=3d255401-a347-4923-97a2-0d7045a92d6a',
    checkStock: async({page})=>{
        const content = (await page.textContent('.ui-pdp-price__second-line')).split(' ')[0]
        let price = Number(content)
        let notCoolPrice = 990000

        let comprar= price < notCoolPrice
        return [comprar, price]
    }
}  ,{
    product:"TELEVISOR",
    url:'https://www.mercadolibre.cl/smart-tv-caixun-c32v1ha-led-hd-32/p/MLC18633467?pdp_filters=category:MLC1002#searchVariation=MLC18633467&position=1&search_layout=stack&type=product&tracking_id=67b657ba-07c6-48af-a06d-be8f930f4642',
    checkStock: async({page})=>{
        const content = (await page.textContent('.ui-pdp-price__second-line')).split(' ')[0]
        let price = Number(content)
        let notCoolPrice = 100000

        let comprar= price < notCoolPrice
        return [comprar, price]
    }
}  ,
{
    product:"ZAPATOS",
    url:'https://articulo.mercadolibre.cl/MLC-500553568-zapatilla-firecamp-remesh-azul-columbia-_JM#searchVariation=41687750458&position=18&search_layout=grid&type=item&tracking_id=077aac11-0753-4c91-bbb7-0e85e548a854&c_id=/home/promotions-recommendations/element&c_element_order=2&c_uid=57c4d5b7-9c77-490f-a87c-5c9a8f7c19fd',
    checkStock: async({page})=>{
        const content = (await page.textContent('.ui-pdp-price__second-line')).split(' ')[0]
        let price = Number(content)
        let notCoolPrice = 50000

        let comprar= price < notCoolPrice
        return [comprar, price]
    }
}  ,

];

(async ()=>{
    const browser = await chromium.launch();

    for(const shop of shops){
        const {checkStock, product, url, comprar2} = shop
        const page = await browser.newPage();
        await page.goto(url)
        const hasStock = (await checkStock({page}))[0]
        const price = (await checkStock({page}))[1]

        console.log(`${product}: ${hasStock ? 'Ahora!!!' : 'Esperando cambios positivos...' } --> ${price}`)   
        await page.close()             
    }
    await browser.close()
}
    )();





  