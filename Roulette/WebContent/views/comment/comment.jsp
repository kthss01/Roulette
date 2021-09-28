<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>방명록</title>

<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/css/comment/styles.css">
</head>
<body>
	<div class="container">
		<div class="msg-box">
			메시지 : ${ (empty msg) ? "방명록에 글을 남겨주세요 감사합니다" : msg }
			<c:remove var="msg"/>
		</div>
	
        <ul>
       		<c:forEach var="comment" items="${ list }" varStatus="cm">
	            <li class="item">
	                <span class="thumbnail"></span>
	                <div class="box-content">
	                    <div class="box-meta">
	                		<span class="commentId" style="display: none">${ comment.id }</span>
	                        <strong>${ comment.writer } (${ comment.ip })</strong>
	                        <span class="date">${ comment.postDate }</span>
	                    </div>
	                    <p class="text">${ comment.content }</p>
	                    <a class="link-comment" href="#">답글</a>
	                    <ul class="list-modify">
	                        <li><a href="#">수정</a></li>
	                        <li><a onclick="deleteComment(${ comment.id });" href="#">삭제</a></li>
	                    </ul>
	                    <div class="comment-control">
	                    	<label for="${ comment.id }">비밀번호 입력</label>	                
	                    	<input type="password" id="${ comment.id }" class="commentPassword" name="commentPassword">
	                	</div>
	                </div>
	            </li>
            </c:forEach>
        </ul>
        
        <!-- 페이징 바 -->
        <!-- root -->
        <c:url var="contextPath" value='/' />
        
        <div class="pagingArea" align="center">
        	<!-- 맨 처음으로 (<<) -->
        	<button class="action-button shadow animate red" onclick="location.href='${ contextPath }commentSelectList.do?currentPage=1'">&lt;&lt;</button>
        	
        	<!-- 이전 페이지로(<) -->
        	<c:choose>
        		<c:when test="${ pi.currentPage == 1 }">
        			<button class="action-button shadow animate yellow" disabled>&lt;</button>
        		</c:when>
        		<c:otherwise>
        			<button class="action-button shadow animate blue" onclick="location.href='${ contextPath }commentSelectList.do?currentPage=${ pi.currentPage - 1 }'">&lt;</button>
        		</c:otherwise>
        	</c:choose>
        	
        	<!-- 페이지 목록 -->
        	<c:forEach var="p" begin="${ pi.startPage }" end="${ pi.endPage }" step="1">
	        	<c:choose>
	        		<c:when test="${ p == pi.currentPage }">
	        			<button class="action-button shadow animate yellow" disabled>${ p }</button>
	        		</c:when>
	        		<c:otherwise>
	        			<button class="action-button shadow animate green" onclick="location.href='${ contextPath }commentSelectList.do?currentPage=${ p }'">${ p }</button>
	        		</c:otherwise>
        		</c:choose>	
        	</c:forEach>
        	
        	<!-- 다음페이지(>) -->
        	<c:choose>
        		<c:when test="${ pi.currentPage == pi.maxPage }">
        			<button class="action-button shadow animate yellow" disabled>&gt;</button>
        		</c:when>
        		<c:otherwise>
        			<button class="action-button shadow animate blue" onclick="location.href='${ contextPath }commentSelectList.do?currentPage=${ pi.currentPage + 1 }'">&gt;</button>
        		</c:otherwise>
        	</c:choose>
        	
        	<!-- 맨 끝으로 (>>) -->
        	<button class="action-button shadow animate red" onclick="location.href='${ contextPath }commentSelectList.do?currentPage=${ pi.maxPage }'">&gt;&gt;</button>
        </div>
    </div>

    <form action="commentInsert.do" method="post">
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
                <input class="submit_btn" type="submit" value="작성">
            </div>
        </fieldset>
    </form>

    <script>
    	// ip 확인
        function getIP(json) {
            //console.log(json);
            //document.write("My public IP address is: ", json.ip);
            const ipInput = document.querySelector('#ipInput');
            ipInput.value = json.ip;
        }
    	
    	function deleteComment(id) {
    		//console.log(id);
    		
    		// 삭제 확인
    		if (!confirm("방명록을 삭제하시겠습니까?")) {
    			return;	
    		}
    		
    		// 폼 생성
    		const form = document.createElement("form");
    		form.setAttribute("charset", "UTF-8");
    		form.setAttribute("method", "post"); // post
    		form.setAttribute("action", "commentDelete.do"); // 요청 보낼 주소
    		
    		const idField = document.createElement("input");
    		idField.setAttribute("type", "text");
    		idField.setAttribute("name", "id");
    		idField.setAttribute("value", id);
    		form.appendChild(idField);
    		
    		const passwordField = document.querySelector(`input[id="\${id}"]`);
    		
    		if (passwordField.value === '') {
    			alert("비밀번호를 입력해주세요");
    			return;
    		}
    		
    		form.appendChild(passwordField);
    		
    		document.body.appendChild(form);
    		form.submit();
    	}
    </script>
    <script src="https://api.ipify.org?format=jsonp&callback=getIP"></script>
</body>
</html>