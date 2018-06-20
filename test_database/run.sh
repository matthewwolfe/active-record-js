docker run --name active-record-test-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=TEST_DB -d -p 3306:3306 mysql:5.7.21
docker start active-record-test-mysql
