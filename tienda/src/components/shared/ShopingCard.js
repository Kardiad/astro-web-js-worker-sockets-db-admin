export class ShopingCard {
    shopComponent = `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {{CARDS}}
    </div>
    `;
    //aquí simportar la carta del carrito de compra y hacer cositas
    cartCompoonent = `
    <div class="w-full max-w-md bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
        <h2 class="text-2xl font-semibold text-heading mb-4">Carrito de Compras</h2>
        <div class="space-y-4">
            {{CARTITEMS}}
        </div>
        <div class="mt-6 flex items-center justify-between">
            <span class="text-xl font-semibold text-heading">Total: {{TOTAL}}</span>
            <button type="button" class="inline-flex items-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
                <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8 0a2 2 0 1 0 0
    4 2 2 0 0 0 0-4Z"/></svg>
                Proceder al Pago
            </button>
        </div>
    </div>  
    `;

    templateCard = `
    <div class="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs" id="{{CARDID}}">
    <a href="#">
        <img class="rounded-base mb-6" src="{{IMAGE}}" alt="product image" />
    </a>
    <div>
        <a href="#">
            <h5 class="text-xl text-heading font-semibold tracking-tight">Apple Watch Series 7 GPS, Aluminium Case, Starlight</h5>
        </a>
            <div class="flex items-center justify-between mt-6">
                <span class="text-3xl font-extrabold text-heading">$599</span>
                <button type="button" class="inline-flex items-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none {{DISABLED}}">
                    <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/></svg>
                    Añadir al carrito
                </button>
            </div>
        </div>
    </div>`;

    templateCart = `
    <div class="flex items-center justify-between p-4 border-b border-default">
        <div class="flex items-center">
            <img class="w-16 h-16 rounded-base me-4" src="{{IMAGE}}" alt="product image" />
            <div>
                <h5 class="text-lg font-semibold text-heading">Apple Watch Series 7 GPS, Aluminium Case, Starlight</h5>
                <span class="text-sm text-body">Cantidad: {{QUANTITY}}</span>
            </div>
        </div>
        <div class="text-right">
            <span class="text-2xl font-extrabold text-heading">{{PRICE}}</span>
        </div>
    </div>`;

    init() {
        
        console.log(globalThis)
        //globalThis['myWorker'].onmessage = (event) => {
        //    if (event.data.action == 'shopdata') {
        //        console.log(event);
        //    }
        //}
        return 'pas';
    }

}