// --- 変数の準備 ---
let finalTitle = "";
let finalCount = 0;
let finalDesc = ""; 

// --- LIFFの初期化 ---
liff.init({ 
    liffId: "2009300693-Rh7o0kuJ" 
});

// --- 結果を計算する魔法の処理 ---
function calculateResult() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    finalCount = checkboxes.length;

    let title = "";
    let desc = "";

    if (finalCount >= 6) {
        title = "6個以上当てはまったあなたは・・・";
        desc = `鉄分が不足しやすい状態につながるサインが多く見られます。
日々の食生活や生活習慣を見直すことで、体調管理を意識することはもちろん、体調に不安がある場合は、専門家や医療機関に相談することも一つの選択肢です。

※本チェックは、日常生活を振り返るための簡易的なセルフチェックです。
※医師による診断や検査に代わるものではありません。
※体調に不安がある場合は、医療機関にご相談ください。`;
    } else if (finalCount >= 3) {
        title = "3〜5個当てはまったあなたは・・・";
        desc = `鉄分不足に注意したいサインが、やや多いようです。
日々の食生活や生活習慣を見直すことで、体調管理を意識しましょう。

※本チェックは、日常生活を振り返るための簡易的なセルフチェックです。
※医師による診断や検査に代わるものではありません。
※体調に不安がある場合は、医療機関にご相談ください。`;
    } else if (finalCount >= 1) {
        title = "1〜2個当てはまったあなたは・・・";
        desc = `鉄分が不足しがちな生活習慣や体調サインが、いくつか見られるようです📋️
日々の食生活や生活リズムを、少し振り返ってみましょう。

※本チェックは、日常生活を振り返るための簡易的なセルフチェックです。
※医師による診断や検査に代わるものではありません。
※体調に不安がある場合は、医療機関にご相談ください。`;            
    } else {
        title = "1個も当てはまらなかったあなたは・・・";
        desc = `現在のところ、鉄分に関する生活習慣や体調のサインは多くありません✨️
今の食生活や生活リズムを引き続き意識していきましょう👏
                
※本チェックは、日常生活を振り返るための簡易的なセルフチェックです。
※医師による診断や検査に代わるものではありません。
※体調に不安がある場合は、医療機関にご相談ください。`;
    }

    // 変数に保存（送信機能で使うため）
    finalTitle = title;
    finalDesc = desc;

    document.getElementById('check-count').innerText = finalCount;
    document.getElementById('result-title').innerText = title;
    document.getElementById('result-desc').innerText = desc;

    document.getElementById('q-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    window.scrollTo(0, 0);
}

// --- LINEにFlex Messageとテキストを送信する処理 ---
document.getElementById('sendBtn').addEventListener('click', () => {
    liff.sendMessages([

        {
            type: "flex",
            altText: "鉄分不足度チェックの結果が届きました！", 
            contents: {
                type: "bubble",
                size: "mega",
                header: {
                    type: "box",
                    layout: "vertical",
                    backgroundColor: "#f68e07",
                    contents: [
                        { type: "text", text: "✨ 鉄分不足度チェック ✨", weight: "bold", color: "#ffffff", align: "center" }
                    ]
                },
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        { type: "text", text: "当てはまった数は...", size: "sm", color: "#666666", align: "center" },
                        { type: "text", text: finalCount + " 個", weight: "bold", size: "3xl", color: "#FF6B81", align: "center", margin: "md" },
                        { type: "separator", margin: "lg" }, 
                        { type: "text", text: finalTitle, weight: "bold", size: "md", color: "#f68e07", margin: "lg", wrap: true },
                        { type: "text", text: finalDesc, size: "sm", color: "#333333", margin: "md", wrap: true }
                    ]
                },
                footer: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        { 
                            type: "button", 
                            style: "primary", 
                            color: "#06C755", 
                            action: { 
                                type: "uri", 
                                label: "もう一度診断する", 
                                uri: "https://liff.line.me/2009300693-Rh7o0kuJ" 
                            } 
                        }
                    ]
                }
            }
        }
    ]).then(() => {
        liff.closeWindow(); 
    }).catch((err) => {
        alert('エラーがおきました: ' + err);
    });
});