const productList = [
    {
        id: '1',
        title: '藥師一',
        price: 10,
        img: 'https://picsum.photos/id/999/1200/600',
        tags: ['台中醫院', '高雄醫院']
    },
    { 
        id: '2',
        title: '藥師二',
        price: 60,
        img: 'https://picsum.photos/id/1070/1200/600',
        tags: ['員林醫院']
    },
    {
        id: '3',
        title: '藥師三',
        price: 180,
        img: 'https://picsum.photos/id/1071/1200/600',
        tags: ['桃園醫院', '新竹醫院']
    },
    {
        id: '4',
        title: '藥師四',
        price: 220,
        img: 'https://picsum.photos/id/1072/1200/600',
        tags: ['桃園醫院', '新竹醫院']
    },
    {
        id: '5',
        title: '藥師五',
        price: 360,
        img: 'https://picsum.photos/id/1073/1200/600',
        tags: ['桃園醫院']
    },
    {
        id: '6',
        title: '藥師六',
        price: 360,
        img: 'https://picsum.photos/id/1074/1200/600',
        tags: ['高雄左營醫院']
    },
    {
        id: '7',
        title: '藥師七',
        price: 400,
        img: 'https://picsum.photos/id/1075/1200/600',
        tags: ['桃園醫院']
    },
    {
        id: '8',
        title: '藥師八',
        price: 450,
        img: 'https://picsum.photos/id/1076/1200/600',
        tags: ['成大醫院', '高雄榮民醫院']
    },
    {
        id: '9',
        title: '藥師九',
        price: 520,
        img: 'https://picsum.photos/id/1077/1200/600',
        tags: ['藥妝', '保養']
    }
];

const appointment =[{
    "resourceType": "Appointment",
    "id": "example",
    "text": {
      "status": "generated",
      "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Brian MRI results discussion</div>"
    },
    "status": "booked",
    "serviceCategory": [
      {
        "coding": [
          {
            "system": "http://example.org/service-category",
            "code": "gp",
            "display": "General Practice"
          }
        ]
      }
    ],
    "serviceType": [
      {
        "coding": [
          {
            "code": "52",
            "display": "General Discussion"
          }
        ]
      }
    ],
    "specialty": [
      {
        "coding": [
          {
            "system": "http://snomed.info/sct",
            "code": "394814009",
            "display": "General practice"
          }
        ]
      }
    ],
    "appointmentType": {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/v2-0276",
          "code": "FOLLOWUP",
          "display": "A follow up visit from a previous appointment"
        }
      ]
    },
    "reasonReference": [
      {
        "reference": "Condition/example",
        "display": "Severe burn of left ear"
      }
    ],
    "priority": 5,
    "description": "Discussion on the results of your recent MRI",
    "start": "2013-12-10T09:00:00Z",
    "end": "2013-12-10T11:00:00Z",
    "created": "2013-10-10",
    "comment": "Further expand on the results of the MRI and determine the next actions that may be appropriate.",
    "basedOn": [
      {
        "reference": "ServiceRequest/myringotomy"
      }
    ],
    "participant": [
      {
        "actor": {
          "reference": "Patient/example",
          "display": "Peter James Chalmers"
        },
        "required": "required",
        "status": "accepted"
      },
      {
        "type": [
          {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                "code": "ATND"
              }
            ]
          }
        ],
        "actor": {
          "reference": "Practitioner/example",
          "display": "Dr Adam Careful"
        },
        "required": "required",
        "status": "accepted"
      },
      {
        "actor": {
          "reference": "Location/1",
          "display": "South Wing, second floor"
        },
        "required": "required",
        "status": "accepted"
      }
    ]
  }];
// TODO: 設計渲染商品的函數
function renderProductList() {
    // 透過迴圈將produstList內的資料一一取出
    productList.forEach(product => {
        // console.log('[product]', product)
    });
}

// TODO: 設計建立單一商品卡片HTML標籤的函數
function createProductCardElement() {
    // 產生一個Bootstrap Card的元件
    // https://getbootstrap.com/docs/4.4/components/card/
    const cardElement = `
        <div class="col-md-4">
            <div class="card">
                <img src="" class="card-img-top">
                <form class="add-item-form card-body">
                    <h5 class="card-title">
                        商品標題
                    </h5>
                    <p class="card-text">
                        商品價格: $100
                    </p>
                    <div class="form-group">
                        <label>購買數量</label>
                        <input class="form-control" type="number" min="1" max="20" required>
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

// 購物車建構式
function Cart() {
    // localStorage key
    this.key = 'example-cart';
    // 購物車的品項
    this.itemList = [];
    // TODO: 初始化購物車
    this.initCart = function () {

    }
    // TODO: 傳入商品id與數量並新增商品至購物車
    this.addItem = function (pid, amount) {

        // TODO: 建構一個購物車品項資料
        // { title: 品名, price: 單價, amount: 數量, createdAt: 新增時間 }

    }
    // TODO: 至購物車刪除於購物車內指定索引商品
    this.deleteItem = function (i) {

    }
    // TODO: 清空購物車
    this.emptyCart = function () {

    }
    // TODO: 更新資料到localStorage
    this.updateDataToStorage = function () {

    }
    // TODO: 渲染購物車
    this.render = function () {
        // 選到id是cartTableBody的元素
        const $tbody = $('#cartTableBody');
        // 選到id是cartTableFoot的元素
        const $tfoot = $('#cartTableFoot');
        // 預設tbody內的內容是空值
        let tbodyContent = '';
        // TODO: 將目前購物車的項目逐項取出

        // 將內容渲染至tbody內
    }
}

// 建立一個購物車的實例
const cart = new Cart();

// TODO: 綁定新增商品至購物車的表單送出事件
$(".add-item-form").submit(function (e) {
    e.preventDefault();
    console.log("[準備新增購物車品項]");

});

// TODO: 綁定清空購物車按鈕的點擊事件
$("#clearCartBtn").click(function () {
    console.log("[準備清空購物車]");

});

// TODO: 綁定移除單一品項的點擊事件
$("#physelect").click(function(e){
    e.preventDefault();
    console.log("[按鈕被觸發]");
})