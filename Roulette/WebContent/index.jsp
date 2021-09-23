<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.kh.common.JDBCTemplate" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.io.File" %>
<!DOCTYPE html>

<%

	Connection conn = JDBCTemplate.getConnection();
	
	File file = new File(".");
	System.out.println(file.getAbsolutePath());
	System.out.println(System.getProperty("user.dir"));

	PreparedStatement pstmt = null;
	ResultSet rset = null;
	
	pstmt = conn.prepareStatement("SELECT * FROM TEST");

	rset = pstmt.executeQuery();
	
	if (rset.next())
		System.out.println(rset.getString(1));
%>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roulette Project</title>

    <link rel="icon" href="<%=request.getContextPath() %>/resources/images/roulette.png">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/resources/css/style.css">

    <!-- roulette api -->
    <script src="<%=request.getContextPath() %>/resources/scripts/Winwheel.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"></script>

    <script src="<%=request.getContextPath() %>/resources/scripts/index.js" type="module"></script>
</head>
<body>
    <h1>룰렛 프로젝트 - 시연 순서 정하기</h1>
    <h3 id="name">KH 정보교육원 허은주 선생님 오후반</h3>
    <main class="App">
    </main>
</body>
</html>