
insert into users (username,password,avatar,token) values ('a1','b', 'c', 'd');
insert into users (username,password,avatar,token) values ('a2','b', 'c', 'd');
insert into users (username,password,avatar,token) values ('a3','b', 'c', 'd');

delete from users;
insert into users (id,username,password,avatar,token) values (1,'bob','$2a$08$mrZQOHperHfwQrc1au5CIecSwA6sy1VceDQIEu7SrzKA/qcXcMsoG', 'a.png', 'tok');


/*insert into notes (user_id,title,body) values (1,'a1','b');
insert into notes (user_id,title,body) values (1,'a2','b2');
insert into notes (user_id,title,body) values (1,'a3','b3');

delete from notes;


insert into notes (user_id,title,body) values (1,'dull','buzz buzz buzz');*/
