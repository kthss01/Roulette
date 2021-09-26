<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>방명록</title>

<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/css/comment/styles.css">

</head>
<body>
	<div class="container">
        <ul>
            <li class="item">
                <span class="thumbnail"></span>
                <div class="box-content">
                    <div class="box-meta">
                        <strong>이름</strong>
                        <span class="date">작성일</span>
                    </div>
                    <p class="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam dolores pariatur fuga provident ab dolor, consectetur sunt officiis rem neque sit, nam ea eligendi distinctio aliquam, eaque nihil? Minima, architecto.</p>
                    <a class="link-comment" href="#">답글</a>
                    <ul class="list-modify">
                        <li><a href="#">수정</a></li>
                        <li><a href="#">삭제</a></li>
                    </ul>
                </div>
            </li>
            <li class="item">
                <span class="thumbnail"></span>
                <div class="box-content">
                    <div class="box-meta">
                        <strong>이름</strong>
                        <span class="date">작성일</span>
                    </div>
                    <p class="text">내용</p>
                    <a class="link-comment" href="#">답글</a>
                    <ul class="list-modify">
                        <li><a href="#">수정</a></li>
                        <li><a href="#">삭제</a></li>
                    </ul>
                </div>
            </li>
            <li class="item">
                <span class="thumbnail"></span>
                <div class="box-content">
                    <div class="box-meta">
                        <strong>이름</strong>
                        <span class="date">작성일</span>
                    </div>
                    <p class="text">내용</p>
                    <a class="link-comment" href="#">답글</a>
                    <ul class="list-modify">
                        <li><a href="#">수정</a></li>
                        <li><a href="#">삭제</a></li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>

    <form action="post">
        <fieldset class="write_box">
            <div class="user_comment_box">
                <textarea name="content" cols="30" rows="10" maxlength="400" placeholder="댓글을 남겨주세요"></textarea>
            </div>
            <div class="user_input_box">
                <input type="hidden" id="ipInput" name="ip">
                <div class="user_input">
                    <input name="writer" type="text">
                </div>
                <div class="user_input">
                    <input name="password" type="password">
                </div>
                <input class="submit_btn" type="submit" value="등록">
            </div>
        </fieldset>
    </form>

    <script>
        function getIP(json) {
            //console.log(json);
            //document.write("My public IP address is: ", json.ip);
            const ipInput = document.querySelector('#ipInput');
            ipInput.value = json.ip;
        }
    </script>
    <script src="https://api.ipify.org?format=jsonp&callback=getIP"></script>
</body>
</html>