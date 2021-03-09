// 所有導覽列中的連結nav-link
const navLinkList = document.querySelectorAll('.navbar a.nav-link'),
    // 導覽列
    navbar = document.getElementById('navbar'),
    // 滑動資訊報告元件
    scrollReport = document.getElementById('scrollReport');

// TODO: 建立章節資訊查詢表 navigationTable
/* 
 * {
 *    section1: {section: sectionDOM, navLink: navLinkDOM},
 *    section2: {...}, ...
 * }
 */
const navigationTable = {};
// 透過迴圈取出 navLinkList 裡面的元素
// function(link){}
//透過迴圈取出navLinklist裡面的元素
//funciton(link){}可以簡化寫成link=>{}
// navLinkList.forEach(function(link){
//     console.log("[link]",link);
// })


// console.log("[查詢表]",navigationTable);
//透過迴圈取出navigationTable裡面的元素
//function(link){}

navLinkList.forEach(link=>{
    const sectionId=link.dataset.target;
    console.log("[區域ID]",sectionId);
    navigationTable[sectionId]={
        //section:section標籤
        section:document.getElementById(sectionId),
        //link:a標籤
        link:link
    };
});

console.log("[查詢表]",navigationTable);
// 綁定視窗(window)的滾動事件(scroll)
// https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
window.addEventListener('scroll', function () {
    // TODO: 取得視窗的直向滑動偵測點(scrollY)
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
    const y =window.scrollY+navbar.offsetHeight;
    //console.log("[現在的座標]",y);
    scrollReport.innerText=`目前座標:${y}`;
    // TODO: 取得每個章節的所在位置頂邊座標(offsetTop)、底邊座標(offsetTop + offsetHeight)
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
    //透過迴圈把每一個在查尋表屬性取出
    for(const sId in navigationTable){
        //console.log("[sectionId]",sId);
        const obj=navigationTable[sId];
        //取得sectionDOM
        const section=obj.section;
        //取得aDOM
        // const link=obj.link;
        //取得每一個section的上邊與底邊座標
        // console.log("[obj]",obj);
        const top = section.offsetTop;
        const bottom=section.offsetTop+section.offsetHeight;
        console.log(top,bottom);
        //&& and
        //判定y是否介於區塊的上邊與底邊之間
        if(y > top && y < bottom){
            console.log(`我現在在${sId}`);
            //為對應的a標籤加上
            // link.classList.add("text-warning");
            section.classList.add("active");
        }else{
            //y並不再此區塊內移除Bootstrap
            // link.classList.remove("text-warning");
            section.classList.remove("active");
        }
    }
    console.log("**************");
});