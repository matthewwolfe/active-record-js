echo "initializing database"
docker stop test-active-record-js-mysql > /dev/null
docker rm test-active-record-js-mysql > /dev/null

docker run --name test-active-record-js-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=tests -d -p 3333:3306 mysql:5.7 > /dev/null

echo "starting database"
docker start test-active-record-js-mysql > /dev/null
sleep 10

echo "running tests"
npm run integration-test-run

echo "cleaning up container"
docker stop test-active-record-js-mysql > /dev/null
docker rm test-active-record-js-mysql > /dev/null

echo "done"
