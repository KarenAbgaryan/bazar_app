export async function productData(){
    const products = await fetch("https://fakestoreapiserver.reactbd.com/products")
    return products
}