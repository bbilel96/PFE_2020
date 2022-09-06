<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Welcome </title>
</head>
<body>
<div style="border-spacing: 0;
border-collapse: collapse;
direction: ltr;
font: 14px sans-serif;
color: #686f7a;
font-size: 16px;
line-height: 1.5em;
border-bottom: 1px solid #f2f3f5;
padding-bottom: 10px;
margin-bottom: 20px;">
    <h3>
        Dear {{$mailData['name']}}
    </h3>
    <p><a style="text-decoration:none;color:#000">You have succefully register to our application<br>Please Confirm with this code </a></p>
    <div style="font-size: 18px;color:red;position:center;height: 30px;width: 100px" >
        {{$mailData['rand']}}
    </div>
</div>
</body>
</html>
