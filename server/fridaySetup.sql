
\echo 'create friday db?'
\prompt 'Return yes or control-C to cancel >' answer

DROP DATABASE friday;
CREATE DATABASE friday;
\connect friday;


\i fridaySchema.sql
