# CrossBrowsersDataLogger

## 專案說明
- 16年3月為了搜集實驗標的的客戶端相關資料所寫的script，也是首次接觸js。

- 搜集的資料包括客戶端ip以及播放器的表現 (initial buffering time、rebuffering duration..etc.)等相關資料。

- 為了配合實驗標的的隱私權政策，因此將資料透過G.A.的自訂維度存於Google Analytics分析平台。

- 由於HTML5 video tag的相關API在各瀏覽器廠商的支援程度或API表現並不一致，因此，在研究W3C所發佈的標準、播放器的底層規格後，設計了盡可能兼容各廠商瀏覽器的資料搜集流程，可參閱[此文件](https://www.google.com/url?q=https://drive.google.com/file/d/0B3c_g2IJ7SqgRExEaGQ5VV9zMHM/view%3Fusp%3Dsharing&ust=1495736040000000&usg=AFQjCNHoTcsQngIR2uv6jWWaZzkdGPTo4Q&hl=zh-TW)獲得更多細節。

- 由於實驗標的在16年4月突然改版，改採JWPlayer而非原生播放器，故此資料搜集script棄用，另建[Embedded_Code_In_iPalace_Video_Channel](https://github.com/alvinyen/Embedded_Code_In_iPalace_Video_Channel)來完成資料搜集。

- google chrome在16年7月已完成waiting、buffering、stalled及suspend等API的修繕，可參閱[No event：waiting、buffering、stalled、suspend is fired when audio/video element has no more data to play.](https://bugs.chromium.org/p/chromium/issues/detail?id=279213)獲得更多細節。