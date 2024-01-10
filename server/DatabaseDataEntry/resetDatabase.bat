@echo off


echo Deleting Tables . . .
node deleteTables.js
echo Tables Deleted!


echo Creating Tables . . .
node createTables.js
echo Tables Created!


cd addMajors

for %%i in (*.js) do (
    echo Running %%i
    node %%i
)

pause