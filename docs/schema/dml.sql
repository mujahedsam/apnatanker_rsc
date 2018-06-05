insert into apex_data(code, name) values ('ROLE', 'NA');
insert into apex_data(code, name) values ('ROLE', 'Basic');
insert into apex_data(code, name) values ('ROLE', 'User');
insert into apex_data(code, name) values ('ROLE', 'Admin');
insert into apex_data(code, name) values ('ROLE', 'SuperAdmin');

insert into apex_data(code, name) values ('MENU', 'admin_dashboard');
insert into apex_data(code, name) values ('MENU', 'app_data');
insert into apex_data(code, name) values ('MENU', 'consumer');
insert into apex_data(code, name) values ('MENU', 'branches');
insert into apex_data(code, name) values ('MENU', 'profiles');
insert into apex_data(code, name) values ('MENU', 'reports');
insert into apex_data(code, name) values ('MENU', 'settings');


insert into agency_grp(id, title, name) values('DL', 'DLTech', 'Digital Lync Tech');


INSERT INTO branch (id, name, grpcode, is_main ) VALUES ('DL_MAIN_BRANCH','DL Tech', 'DLTECH', true);

insert into img( id)  values('SUPPORT_DL');

insert into address(id) values('SUPPORT_DL');



INSERT INTO profile (id, name, email, mobile, password, role, branch_id, img_id, address_id, grpcode )
    VALUES ('SUPPORT_DL','Support User','support@digitallynctech.com','123456789', '1234', 'SuperAdmin',  'DL_MAIN_BRANCH', 'SUPPORT_DL', 'SUPPORT_DL', 'DLTECH');


insert into apex_report (id, name, report_url)  values('consumer', 'Consumers Report', 'consumer');
    
insert into apex_report_data(id, name, status, apex_report_id) values('consumer_consumer', 'consumer', true, 'consumer');
insert into apex_report_data(id, name, status, apex_report_id) values('consumer_fromdate', 'fromDate', true, 'consumer');
insert into apex_report_data(id, name, status, apex_report_id) values('consumer_todate', 'toDate', true, 'consumer');

