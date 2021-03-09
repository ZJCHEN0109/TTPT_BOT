$(function(){ //防止網站資料被竄改所有程式碼放到function內-資安設定
    // 產品列表
//[{},{},{},{},{}]
const productList = [
    {
        "id": '1',
        "title": '產品一',
        "price": 10,
        "img": 'https://picsum.photos/id/999/1200/600',
        tags: ['生活用品', '工具']
    },
    {
        id: '2',
        title: '產品二',
        price: 60,
        img: 'https://picsum.photos/id/1070/1200/600',
        tags: ['藥妝']
    },
    {
        id: '3',
        title: '產品三',
        price: 180,
        img: 'https://picsum.photos/id/1071/1200/600',
        tags: ['食品', '飲料']
    },
    {
        id: '4',
        title: '產品四',
        price: 220,
        img: 'https://picsum.photos/id/1072/1200/600',
        tags: ['生活用品', '文具']
    },
    {
        id: '5',
        title: '產品五',
        price: 360,
        img: 'https://picsum.photos/id/1073/1200/600',
        tags: ['工具']
    },
    {
        id: '6',
        title: '產品六',
        price: 360,
        img: 'https://picsum.photos/id/1074/1200/600',
        tags: ['食品']
    },
    {
        id: '7',
        title: '產品七',
        price: 400,
        img: 'https://picsum.photos/id/1075/1200/600',
        tags: ['生活用品', '工具']
    },
    {
        id: '8',
        title: '產品八',
        price: 450,
        img: 'https://picsum.photos/id/1076/1200/600',
        tags: ['生活用品', '工具']
    },
    {
        id: '9',
        title: '產品九',
        price: 520,
        img: 'https://picsum.photos/id/1077/1200/600',
        tags: ['藥妝', '保養']
    }
];

// TODO: 設計渲染商品的函數
function renderProductList() {
    // 透過迴圈將produstList內的資料一一取出
    productList.forEach(product => {
        console.log('[product]', product);
        //取得一張卡片的HTML
        const card = createProductCardElement(product); //由return回傳取得資料
        // console.log("[card]",card);
        //以下兩種寫法javascript/JQUERY
        //document.getElementById("productRow").innerHTML+=card;//放入HTML
        $("#productRow").append(card);//放入HTML
    });
}

// TODO: 設計建立單一商品卡片HTML標籤的函數
function createProductCardElement(product) {
    // 產生一個Bootstrap Card的元件
    // https://getbootstrap.com/docs/4.4/components/card/
    const cardElement = `
        <div class="col-md-4">
            <div class="card mb-3">
                <img src="${product.img}" class="card-img-top">
                <form data-pid=${product.id} class="add-item-form card-body">
                    <h5 class="card-title">
                        商品標題${product.title}
                    </h5>
                    <p class="card-text">
                        商品價格: $${product.price}
                    </p>
                    <div class="form-group">
                        <label>購買數量</label>
                        <input id="amountInput${product.id}" class="form-control" type="number" min="1" max="20" required>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" type="submit">
                            <i class="fas fa-cart-plus"></i> 
                            加入購物車
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    return cardElement;
}

// 渲染商品列表至畫面上
renderProductList();

// 購物車建構式(物件導向)
// 建構式是一種用來產生物件的函數，定義名稱第一個字要大寫
function Cart() {
    //建構式裡的this用來代表透過此建構式產生的物件
    //localStorage key
    //物件.屬性=值
    this.key = 'example-cart';
    // 購物車的品項
    this.itemList = [];

    // TODO: 初始化購物車，為了頁面重整後保留購物資訊，
    //但特別注意到第一次到APP的使用者會發生物件無法讀取的錯誤
    //因此需要判斷式判斷初次使用此頁面
    this.initCart = function () {
        //取回字串化後的物件
        //如果該值不存在，將會回傳null，因此必須要判斷式IF協助判斷
        const itemListStr=localStorage.getItem(this.key);
        //轉回物件
        const defaultList=JSON.parse(itemListStr);
        console.log("[defaultList]",defaultList);
        // if(defaultList){
        //     this.itemList=defaultList;
        // }else{
        //     this.itemList=[]; //資料不存在預設空白陣列
        // }
        //簡化的寫法
        this.itemList=defaultList || [];//判斷default是否存在，等同if else判斷式
        //再次渲染購物車內容
        this.render();
    }

    // TODO: 傳入商品id與數量並新增商品至購物車
    this.addItem = function (pid, amount) {
        console.log(pid,amount);
        //建構一個購物車品項資料
        //取得商品的詳細資料
        //陣列.find()
        const product=productList.find(product=>{ //取一個代名詞product找到符合id==pid的資料回傳return給const product接收
            //找到產品的id==pid的資料 
            return product.id==pid;

        });
        console.log("[商品詳情]",product);
        // TODO: 建構一個購物車品項資料
        //{title:品名,price:單價,amount:數量,createAt:新增時間}
        //產生新物件 = new 建構式()
        // const cart = new Cart();
        // console.log("購物車",cart);
        const item={
            //JS語法糖
            // id:product.id,
            // img:product.img,          
            // price:product.price,
            // tags:product.tags,
            // title:product.title,
            ...product,//...調表內所有東西放入物件item
            amount: amount, //product.amount會產生undefine錯誤
            //屬性名稱和變數相同可以直接使用 amount,
            createdAt: new Date().getTime()
        };
        console.log("[購物車品項]",item);
        //陣列.push(新資料) 將資料加到陣列使用push
        this.itemList.push(item);
        //使用render將陣列資料渲染購物車清單請看第181行
        this.render();//呼叫此函數執行後續工作
        // { title: 品名, price: 單價, amount: 數量, createdAt: 新增時間 }

    }
    // TODO: 至購物車刪除於購物車內指定索引商品
    this.deleteItem = function (i) {
        //從清單內移除1筆索引是i的品項
        this.itemList.splice(i,1);//第i起算刪除計1個
        //渲染畫面
        this.render();
    }
    // TODO: 清空購物車
    this.emptyCart = function () {
        this.itemList=[];//陣列清空但畫面未清空
        this.render(); //再次利用空的陣列執行渲染畫面
    }
    // TODO: 更新資料到localStorage
    this.updateDataToStorage = function () {
        //取得字串化的itemList
        const itemListStr=JSON.stringify(this.itemList);
        localStorage.setItem(this.key,itemListStr);//key為example-cart可以透過Chromw檢查application查到暫存資料
    }
    // TODO: 渲染購物車
    this.render = function () {

        //更新資料到localstorage儲存到瀏覽器Chrome內，確保頁面重整購物車仍有保留
        this.updateDataToStorage();

        // 選到id是cartTableBody的元素
        const $tbody = $('#cartTableBody');
        // 選到id是cartTableFoot的元素
        const $tfoot = $('#cartTableFoot');

        //清空$tbody內舊的HTML,避免品項重複出現
        $tbody.empty();
        //預設購物車總金額為0
        let cartValue=0;
        // TODO: 將目前購物車的項目逐項取出
        //陣列.forEach((迭代子,索引)=>{})
        this.itemList.forEach((item,idx)=>{


            // console.log("item",item);
            //定義一個品項的總價值
            const itemValue=item.price*item.amount;
            //把每一個品項價格加總至總價
            cartValue += itemValue;
            //描述資料創建時間
            const time=moment(item.createdAt).format("YYYY年MM月DD日 HH:mm:ss");

            //描述一個表格的橫排
            const tr=`<tr>
                <td>
                    <div class="d-flex">
                        <button data-index="${idx}" class="delete-btn btn btn-danger btn-sm">
                            &times;
                        </button>
                        <div>
                            <p class="m-0">${item.title}</p>
                            <p class="m-0 text-gray">${time}</p>
                        </div>
                    </div>
                </td>
                <td class="text-right">$${item.price}</td>
                <td class="text-right">${item.amount}</td>
                <td class="text-right">$${itemValue}</td>
            </tr>`;
            //將上述字串tr放到cartTableBody內
            $tbody.append(tr);
        })
        //渲染提示數字
        $("#cartNumber").text(this.itemList.length);
        // 將內容渲染至tfoot內
        //DOM.innerHTML=""
        $tfoot.html(`<tr>
            <th>總金額</th>
            <td colspan="3" class="text-right">$${cartValue}</td>
        </tr>`)
    }
}

// 建立一個購物車的實例
const cart = new Cart();

//初始化購物車為了保留購物資料做準備
cart.initCart();
console.log("購物車",cart);

// TODO: 綁定新增商品至購物車的表單送出事件
// 選擇class="add-item-form"的元素
$(".add-item-form").submit(function (e) {
    e.preventDefault(); //避免按鈕後頁面重新整理
    console.log("[準備新增購物車品項]");
    //console.log(this);//可以判定目前作用到的表單
    //取得submit的.add.-item-form
    const form=this;//作用中的表單
    //console.dir(form)
    // console.log(form);
    //取得產品data-pid的值
    const pid=form.dataset.pid;
    // console.log("[產品id]",pid)
    //取得該pid所對應的數量
    // document.getElementById(`amountInput${pid}`).value
    let amount=$(`#amountInput${pid}`).val();
    amount=parseInt(amount);
    //不論用javascript或jquery取的value均為字串必須轉換成整數
    // console.log("[數量]",amount);

    //把產品ID與數量傳給購物車的新增品項函式，記得前面已經new一個cart物件
    cart.addItem(pid,amount);
});

// TODO: 綁定清空購物車按鈕的點擊事件
$("#clearCartBtn").click(function () {
    console.log("[準備清空購物車]");
    cart.emptyCart();
});

// TODO: 綁定移除單一品項 .delete-btn的點擊事件
//要取得目前按鈕需用傳統函數function不能用 =>取代
//但有bug造成失效必須到initicart第103行defaulist、第205行empty()移除HTML造成，
// $(".delete-btn").click(function(){
//     console.log("要移除的按鈕",this);
// });

//使用絕對不會從HTML被刪除掉的方式，首先找出tbody確保不會被刪除的元素
//綁定#cartTableBody裡的動態生成元件，.delete-btn的點擊事件
$("#cartTableBody").delegate(".delete-btn","click",function(){
    console.log("要移除的按鈕",this);
    // const index=parseInt(this.dataset.index);
    const index=parseInt($(this).attr("data-index"));
    console.log("inde:",index);
    //將要移除的索引傳給deleteItem函數
    cart.deleteItem(index);

});

})
