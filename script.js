//ネットで拾ってきたcsv>>二次元配列のコードを少し加工
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
    
    console.log(dataArray)
    $.each(dataArray,function(i,v){
        if(i==0){
            console.log(v)
            $("#data-table > thead").append("<tr></tr>")
            $.each(v,function(ii,vv){
                $("#data-table > thead > tr")
                .append("<td id='th" + ii +"'></td>")
                if(ii!==0){$("#th"+ii).text(vv)}
            })
        }else{ 
            $("#data-table > tbody").append("<tr id='tr" + i +"'></tr>")
            $.each(v,function(ii,vv){
                $("#tr"+i)
                .append("<td>" + vv + "</td>")
            })
        } 
    })
}

$(function(){
    csv_data("data.csv")
})