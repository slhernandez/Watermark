/*
 * For reference only. In case anyone was curious about how the table pdf_files was created.
 */

CREATE SEQUENCE pdf_files_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE pdf_files (
  id bigint DEFAULT nextval('pdf_files_id_seq'::regclass) NOT NULL PRIMARY KEY,
  filename TEXT UNIQUE NOT NULL,
  filepath TEXT NOT NULL,
  mimetype TEXT NOT NULL,
  size BIGINT NOT NULL,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);