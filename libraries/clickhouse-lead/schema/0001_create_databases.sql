-- +goose up
CREATE DATABASE leads;
CREATE DATABASE billing;
CREATE DATABASE business;

-- +goose down
DROP DATABASE leads;
DROP DATABASE billing;
DROP DATABASE business;
