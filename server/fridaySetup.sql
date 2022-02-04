
\echo 'create friday5 db?'
\prompt 'Return yes or control-C to cancel >' answer

DROP DATABASE friday5;
CREATE DATABASE friday5;
\connect friday5;


\i fridaySchema.sql
