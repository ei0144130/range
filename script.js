//ネットで拾ってきたcsv>>テーブルのコードを加工したものを即時起動
//https://qiita.com/hiroyuki-n/items/5786c8fc84eb85944681
function csv_data(dataPath) {
	const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
    request.addEventListener('load', (event) => { // ロードさせ実行
        const response = event.target.responseText; // 受け取ったテキストを返す
	    csv_array(response); //csv_arrayの関数を実行
	});
	request.open('GET', dataPath, true); // csvのパスを指定
	request.send();
}
function csv_array(data) {
	const dataArray = []; //配列を用意
	const dataString = data.split('\r\n'); //改行で分割
	for (let i = 0; i < dataString.length; i++) { //あるだけループ
		dataArray[i] = dataString[i].split(',');
	}
    
    $.each(dataArray,function(i,v){
        if(i==0){ 
            //ヘッダーをテーブルに
            $("#data-table > thead").append("<tr></tr>")
            $.each(v,function(ii,vv){
                $("#data-table > thead > tr").append("<td>" + vv + "</td>")
            })
        }else{
            //レコードをテーブルに
            $("#data-table > tbody").append("<tr id='tr" + i +"'></tr>")
            $.each(v,function(ii,vv){
                $("#tr"+i).append("<td>" + vv + "</td>")
            })
        } 
    })
}
$(function(){csv_data("data.csv")})

//フィルターを実装
let filterActual = function(){
    //全ての行を初期化
    $("tbody > tr").each(function(i,e){
        $(e).attr("class","") 
    })  
    //各checkboxごとに処理
    $("input[type='checkbox']").each(function(i,e){
        //checkedのcheckboxのvalueと同じ内容のセルを探す
        if(e.checked){ 
            $("tbody td").each(function(ii,ee){
                if($(ee).html() == e.value){ 
                    //そのセルのある行をcheckedとして記録
                    $(ee).parent().addClass("checked")
                }
            }) 
        }  
    })
    //checkedと記録された行のみを表示
    $("tbody > tr").each(function(i,e){ 
        if($(e).attr("class") == "checked"){$(e).show()}else{$(e).hide()}     
    }) 
}

//checkboxが動いたらフィルター起動
$(document).on("change","input[type='checkbox']",()=>filterActual())

//check allを処理してフィルターを起動
$(document).on("click","#check-all",function(){
    $("input[type='checkbox']").each(function(i,e){
        e.checked = true
    })
    filterActual()
}) 

//uncheck allを処理してフィルターを起動
$(document).on("click","#uncheck-all",function(){
    $("input[type='checkbox']").each(function(i,e){
        e.checked = false
    })
    filterActual()
})  