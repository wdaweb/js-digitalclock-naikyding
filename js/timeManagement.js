var nowTime,
year,
month,
day,
days,
hours,
min,
sec;
var days_array = ['SUN','MON','TUE','WED','THU','WED','SAT'];
var day_array = [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'
];
var timingID = new Object();
var timeID = setInterval(function(){

//-------------DATE_RESET-------------//
nowTime = new Date();
//-------------DATE-------------------//
year = nowTime.getFullYear(); //2019
month = day_array[nowTime.getMonth()]; 
day = nowTime.getDate(); //23
days = days_array[nowTime.getDay()];
month_d = Math.floor(month/10);
month_s = Math.floor(month%10);
day_d = Math.floor(day/10);
day_s = Math.floor(day%10);
//--------------TIME------------------//
hours = nowTime.getHours(); //hours
hours = (hours<10)?`0${hours}`:hours;
min = nowTime.getMinutes(); //minutes
min = (min<10)?`0${min}`:min;
sec =nowTime.getSeconds(days); //sec
sec_d = Math.floor(sec/10);
sec_s = Math.floor(sec%10);

$('h2').text(`
    ${hours} : ${min} : ${sec_d}${sec_s}
`);
$('h5').text(`
    ${days}, ${month} ${day}, ${year}
`);

},1000);
$('.plus_btn').click(plusItem);

function plusItem(){
    if($(this).siblings('p').length<5){
        let text = $(this).siblings('span').text();
        $(this).before(`
            <p>
                <input  class="d-inline w-50 my-3 mb-1 form-control" type="text" name="name" placeholder="想增加的工作項目" >　
                <button class="btn btn-primary send_btn "  ><i class="fas fa-check"></i></button>
                <button class="btn btn-danger cancel_btn"><i class="fas fa-times"></i></button>
            </p>
        `);
        $('.cancel_btn').click(function(){
            $(this).parents('p').remove();
        });
        $('.send_btn').click(plusItems);
    }else{
        alert(`你已超過新增的上限!!`);
    }
}
function plusItems(){
let item = $(this).siblings('input[type="text"]').val();
if(item.length>0){
    $(this).parents('.items').find('.plus_btn').before(`
        <p class="px-5  w-100 d-flex" ><span class="item ">${item}</span>
        <span class="ml-auto text-white"></span><button class="ml-auto btn start_btn  " name=${item}><i class="fas fa-lg fa-play-circle"></i></button></p>
    `)
    $(this).parents('p').remove();
    $('.start_btn').click(timing);
}else{
    alert(`請輸入工作項目`);
}
}
function timing(){
let itemName = $(this).attr('name');
$(this).before(`<button class="clear_btn btn " name=${itemName}><i class="fas fa-lg fa-pause-circle"></i></button>`);
$(this).remove();

$('.clear_btn').click(function(){
    let clear_item = $(this).attr('name');
    clearInterval(timingID[clear_item]);
    $(this).siblings('.ml-auto').prepend('<b>花費時間　</b>');
    $(this).remove();
});

let num = 0;
let num_Min = 0;
let num_Hour = 0;
timingID[itemName] = setInterval(function(){
    if(num>=60){
        num_Min++;
        num = 0;
        num = (num<10)?`0${num}`:num;
    }else{
        num = (num<10)?`0${num}`:num;
    }
    if(num_Min>=60){
        num_Hour++;
        num_Min = 0;
        num_Min = (num_Min<10)?`0${num_Min}`:num_Min;
    }else if(Number(num_Min)>0){
            num_Min = (num_Min<10)?`0${Number(num_Min)}`:num_Min;                        
    }else if(Number(num_Min)==0){
        num_Min = '00';
    }
    if(num_Hour>8){
        alert(`超過了計時上限!!`);
    }else if(Number(num_Hour)>0){
        num_Hour = (num_Hour<10)?`0${Number(num_Hour)}`:num_Hour;                        
    }else if(Number(num_Hour)==0){
        num_Hour = '00';
    }
        $(`button[name=${itemName}]`).prev().text(`${num_Hour}:${num_Min}:${num}`);
    num++;
},1000);
} 
$('h1').click(function(){
$('.dis_time').slideToggle();
});