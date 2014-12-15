#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

psql $1 -f ../../db/tables/users.sql
psql $1 -f ../../db/tables/notes.sql
psql $1 -f ../../db/tables/tags.sql
psql $1 -f ../../db/tables/photos.sql
psql $1 -f ../../db/tables/notes-tags.sql


psql $1 -f ../../db/functions/add-note.sql
psql $1 -f ../../db/functions/nuke-note.sql
psql $1 -f ../../db/functions/show-note.sql
psql $1 -f ../../db/functions/query-notes.sql
