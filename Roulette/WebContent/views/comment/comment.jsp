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
			msg : ${ requestScope.msg }
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
	                        <li><a href="#">삭제</a></li>
	                    </ul>
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