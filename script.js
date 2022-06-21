const data = getCSV("data.csv")

$(function(){
    $.each(data,function(i,v){
        if(i==0){
            $.each(v,function(ii,vv){
                $("#data-table > thead > tr")
                .append("<td id='th" + ii +"'></td>")
                if(ii!==0){$("#th"+ii).text(vv)}
            })
        }else{
            $.each(v,function(ii,vv){
                $("#data-table > tbody > tr")
                .append("<td>" + vv + "</td>")
            })
        }
    })
})

//ネットで拾ってきたcsv>>二次元配列のコードを少し加工
//https://uxmilk.jp/11586

//CSVファイルを読み込む関数getCSV()の定義
function getCSV(csv){
    let result = [] //戻り値格納用
    let req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", csv, true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
	
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function(){
	    result = convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
    
    return result
}
 
// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    let result = []; // 最終的な二次元配列を入れるための配列
    let tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
 
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(let i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }

    return result
}