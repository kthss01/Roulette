package com.practice;

import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class Practice {
	public static void main(String[] args) {
		Connection conn = null;

		Properties prop = new Properties();

		try {

			String driver = "oracle.jdbc.driver.OracleDriver";
			// DB_URL="jdbc:oracle:thin:@dbname_high?TNS_ADMIN=C:\\Users\\test\\wallet_dbname"
			String url = "jdbc:oracle:thin:@roulette_high?TNS_ADMIN=C:/Users/Kay/Downloads/Study/ocp/Wallet_Roulette";
			String user = "admin";
			String password = "Khsideproject0704";

			// 1. 클래스 객체 등록, Driver 등록
			Class.forName(driver);

			// 2. DBMS와 연결
			conn = DriverManager.getConnection(url, user, password);

			System.out.println("연결 성공");

		}catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
