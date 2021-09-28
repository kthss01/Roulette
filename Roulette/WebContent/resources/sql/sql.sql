CREATE TABLE COMMENT_TABLE (
    ID NUMBER PRIMARY KEY,
    IP VARCHAR(20) NOT NULL,
    WRITER NVARCHAR2(30) NOT NULL,
    PASSWORD NVARCHAR2(30) NOT NULL,
    CONTENT NVARCHAR2(400) NOT NULL,
    POST_DATE DATE DEFAULT SYSDATE,
    IS_DELETE VARCHAR(2) DEFAULT 'N',
    PARENT_ID NUMBER,
    CONSTRAINT COMMENT_DELETE_CK CHECK (IS_DELETE IN('Y', 'N'))
);

DROP TABLE COMMENT_TABLE;

COMMENT ON COLUMN COMMENT_TABLE.ID IS '방명록 번호';
COMMENT ON COLUMN COMMENT_TABLE.IP IS '작성자 IP 주소';
COMMENT ON COLUMN COMMENT_TABLE.WRITER IS '작성자';
COMMENT ON COLUMN COMMENT_TABLE.PASSWORD IS '비밀번호';
COMMENT ON COLUMN COMMENT_TABLE.CONTENT IS '작성 내용';
COMMENT ON COLUMN COMMENT_TABLE.POST_DATE IS '작성일';
COMMENT ON COLUMN COMMENT_TABLE.IS_DELETE IS '삭제여부';
COMMENT ON COLUMN COMMENT_TABLE.PARENT_ID IS '댓글 대상 번호';

-- sequence
CREATE SEQUENCE SEQ_COMMENTID;
DROP SEQUENCE SEQ_COMMENTID;

-- DML
-- getListCount
SELECT COUNT(*) FROM COMMENT_TABLE WHERE IS_DELETE = 'N';

-- SelectAllComment
SELECT * FROM (SELECT ROWNUM RNUM, A.* FROM (SELECT * FROM COMMENT_TABLE WHERE IS_DELETE = 'N' ORDER BY ID DESC) A) WHERE RNUM BETWEEN 3 AND 6;

-- SelectComment
SELECT * FROM COMMENT_TABLE WHERE ID = 1;

-- insertComment
INSERT INTO COMMENT_TABLE VALUES(SEQ_COMMENTID.NEXTVAL, 'ip', 'writer', '1234', 'content', SYSDATE, DEFAULT, NULL);

-- updateComment
UPDATE COMMENT_TABLE SET CONTENT = 'test' WHERE ID = 1;

-- deleteComment
DELETE FROM COMMENT_TABLE WHERE ID = 1;
UPDATE COMMENT_TABLE SET IS_DELETE = 'Y' WHERE ID = 1;

SELECT COUNT(*) FROM COMMENT_TABLE;

SELECT 1 FROM DUAL;

COMMIT; -- 이거 안해서 더미 데이터 확인이 mybatis에서 안된거