window.onload = function() {
  // ダウンロードボタンを押した際のイベントを登録
  $btn.onclick = () => {
    // blob オブジェクトを生成
    var content = $input.value;
    var blob = new Blob([content], { type: 'text/plain' });
    
    // download の href に object url を設定
    $btn.href = window.URL.createObjectURL(blob);
  };
  
  $inputFile.onchange = async (e) => {
    // ファイルオブジェクトを取得
    var file = e.currentTarget.files[0];
    if (!file) return ;
    
    // 中身を取得
    var text = await fetchAsText(file);
    
    // テキストエリアに代入
    $input.value = text;
  };
};

// ファイルから内容をテキストとして取得する Promise を返す
var fetchAsText = (file) => {
  return new Promise((resolve) => {
    var fr = new FileReader();
    fr.onload = (e) => {
      // 読み込んだ結果を resolve する
      resolve(e.currentTarget.result);
    };
    // 読み込む
    fr.readAsText(file);
  });
};
