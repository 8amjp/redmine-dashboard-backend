# redmine-dashboard-backend

[Redmine Dashboard (with CoreUI for Angular)](https://github.com/8amjp/redmine-dashboard-coreui-angular) のバックエンドプログラムです。

*なぜバックエンドプログラムが必要なの？*  
直接RedmineのAPIにアクセスするとCORS周りで怒られるからです。

*何をするプログラムなの？*  
cronで定期的にRedmine APIにアクセスしてJSONファイルのキャッシュを作成します。ダッシュボードはそっちにアクセスします。
