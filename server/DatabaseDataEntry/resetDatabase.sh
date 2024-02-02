#!/bin/bash

echo "Deleting Tables . . ."
node deleteTables.js
echo "Tables Deleted!"

echo "Creating Tables . . ."
node createTables.js
echo "Tables Created!"

cd addMajors

for file in *.js; do
    echo "Running $file"
    node "$file"
done

cd ../addMinors

for file in *.js; do
    echo "Running $file"
    node "$file"
done

read -p "Press return to continue . . ."
