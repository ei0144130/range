//ネットで拾ってきたcsv>>テーブルのコードを加工したものを即時起動
//https://qiita.com/hiroyuki-n/items/5786c8fc84eb85944681
function csv_data(dataPath,func) {
	const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
    request.addEventListener('load', (event) => { // ロードさせ実行
        const response = event.target.responseText; // 受け取ったテキストを返す
        const dataArray = []; //配列を用意
	    const dataString = response.split('\r\n'); //改行で分割
	    for (let i = 0; i < dataString.length; i++) { //あるだけループ
		    dataArray[i] = dataString[i].split(',');
	    }
        func(dataArray); //funcの関数を実行
	    });
	request.open('GET', dataPath, true); // csvのパスを指定
	request.send();
}
function csv_array(data) {
    $.each(data,function(i,v){
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
$(function(){$.when(
        csv_data("data.csv?1533", csv_array) //配列をテーブルに
    ).done(
        csv_data("exam.csv?1533",csv_url) //配列からリンク生成
    )
})

//配列からリンクを生成
let csv_url = function(data){
    $.each(data,function(i,v){
        if(i!==0){//ヘッダ行を排除
            $.each(v,function(ii,vv){
                if(ii!==0 &&vv!==""){//レコード名と空データ以外を対象
                    $("#tr"+i+" td:nth-child(" + (ii+1) + ")")
                    .attr({"data-url": vv,"class": "urlAdded"})
                }
            })
        }  
    }) 
}

//リンクへのポップアップを生成
let pop_url = function(title,txt){
    let urlArray = txt.split("|")
    let hTxt = ""
    hTxt += "<div class='URLtitle'>" + title + "</div>"
    urlArray.forEach((element,index) => {
        hTxt += "<div class='URLele'>"
                + "URLその" + (index+1) + "<br>"
                + "<a target='_blank' href='"
                + element + "'>" + element + "</a></div>"
    }); 
    $("#popURL").html(hTxt)
}
 
$(document).on("click",".urlAdded",function(){
    let ele = $(this)
    let title = ""
    title += ele.parents("tr").find("td:first-child").html()
    let txt = ""
    txt += ele.attr("data-url")
    pop_url(title,txt)
    $("#popURL").show()
    $("#mask").show()
})

$(document).on("click", "#mask", function(){
    $(this).hide()
    $(".mask-toggle").hide()
})
 
//フィルターを実装
let filterActual = function(){
    //全ての行を初期化
    $("tbody > tr").each(function(i,e){
        $(e).attr("class","") 
    }) 

    //フィルタ対象を確認
    let filterLatest = $("#allTerm").prop("checked")
    //各checkboxごとに処理
    $("input[type='checkbox']").each(function(i,e){
        //checkedのcheckboxのvalueと同じ内容のセルを探す
        if(e.checked){ 
            $("tbody tr").each(function(tri,tre){ 
                $(tre).find("td").each(function(ii,ee){
                let filterCondition = $(ee).html() == e.value
                if(filterLatest && ii !== 1){
                    filterCondition = false   
                }
                if(filterCondition){  
                    //そのセルのある行をcheckedとして記録
                    $(ee).parents("tr").addClass("checked")
                } 
            })})  
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
        if($(e).attr("name") !== "allTerm") {e.checked = true}
    })
    filterActual()
}) 

//uncheck allを処理してフィルターを起動
$(document).on("click","#uncheck-all",function(){
    $("input[type='checkbox']").each(function(i,e){
        if($(e).attr("name") !== "allTerm"){e.checked = false}
    })
    filterActual()
})  