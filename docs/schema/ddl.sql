DDL
create table log_data ( data text, updated_on datetime default now() );

create table apex_data (
    name varchar(30) not null,
    code varchar(30) not null,
    status boolean not null default true
);
alter table apex_data add constraint apex_data_uq_name_code unique( name, code);


create table agency_grp (
	  id varchar(9) primary key,
	  name varchar(50) not null,
	  title varchar(100) not null,
	  logo longtext,
	  status boolean not null default true
);
create table service_code(
	id varchar(30) primary key,
        name varchar(50) not null,
	img_required  boolean not null default false,
	signature_required  boolean not null default false,
	hide_route  boolean not null default false,
	active boolean not null default true,
	updated_by varchar(30) not null default 'system',
	updated_on timestamp not null default now()
);

create table habitations (
	id varchar(30) primary key,
        state varchar(50),
	district varchar(50),
	mandal varchar(50),
	panchayath varchar(50),
	village varchar(50),
	habitation varchar(50),
	total_population int,
	lat varchar(30),
	lng varchar(30),
	active boolean not null default true,
	grpcode varchar(9) not null,
	updated_by varchar(30) not null default 'system',
	updated_on timestamp not null default now()
);

create table vehicle (
	id varchar(30) primary key,
	vehicle_no varchar(50) not null,
        consumer_id varchar(30) not null,
	vehicle_condition varchar(100),
        capacity  varchar(20),
	active boolean not null default true,
	grpcode varchar(9) not null,
	updated_by varchar(30) not null default 'system',
	updated_on timestamp not null default now()
);
alter table vehicle add constraint vehicle_fk_consumer_id  foreign key (profile_id ) references consumer(id);

create table user_vehicle(
	id varchar(30) primary key,
	profile_id varchar(30) not null,
	vehicle_id varchar(30) not null,
	service_code_id varchar(30) not null,
        habitations_id varchar(30) not null,
	grpcode varchar(9) not null,
	updated_by varchar(30) not null default 'system',
	updated_on timestamp not null default now()
);
alter table user_vehicle add constraint user_vehicle_fk_profile_id  foreign key (profile_id ) references profile(id);
alter table user_vehicle add constraint user_vehicle_fk_vehicle_id   foreign key (vehicle_id) references vehicle(id);
alter table user_vehicle add constraint user_vehicle_fk_service_code_id   foreign key (service_code_id) references service_code(id);
alter table user_vehicle add constraint user_vehicle_fk_habitations_id   foreign key (habitations_id) references habitations(id);



create table tracking(
	id varchar(30) primary key,
	profile_id varchar(30) not null,
	vehicle_id varchar(30) not null,
	service_code_id varchar(30) not null,
        habitations_id varchar(30) not null,
		-- destination_id varchar(30) not null,
	avg_time bigint default 0,
	avg_distance bigint default 0,
	amt bigint default 0,
	status varchar(30) not null,
	grpcode varchar(9) not null,
	updated_by varchar(30) not null default 'system',
	updated_on timestamp not null default now()
);
alter table tracking add constraint tracking_fk_profile_id  foreign key (profile_id ) references profile(id);
alter table tracking add constraint tracking_fk_vehicle_id   foreign key (vehicle_id) references vehicle(id);
alter table tracking add constraint tracking_fk_service_code_id   foreign key (service_code_id) references service_code(id);
alter table tracking add constraint tracking_fk_habitations_id   foreign key (habitations_id) references habitations(id);
-- alter table tracking add constraint tracking_fk_source_id   foreign key (habitations_id) references habitations(id);
-- alter table tracking add constraint tracking_fk_destination_id   foreign key (habitations_id) references habitations(id);

create table tracking_route (
	id varchar(30) primary key,
	day_time timestamp not null default now(),
	lat varchar(30),
	lng varchar(30),
	tracking_id varchar(30) not null,
	grpcode varchar(9) not null
);
alter table tracking_route add constraint tracking_route_fk_tracking_id  foreign key (tracking_id ) references tracking(id);

create table tracking_img (
	id varchar(30) primary key,
	load_img longtext,
	done_img longtext,
	tracking_id varchar(30) not null,
	grpcode varchar(9) not null,
	updated_by varchar(30) not null default 'system',
	updated_on timestamp not null default now()
);
alter table tracking_img add constraint tracking_img_fk_tracking_id  foreign key (tracking_id ) references tracking(id);

create table apex_report (
	 id varchar(30) primary key,
	 name varchar(99) not null,
	 report_url varchar(99) not null
);
create table apex_report_data (
	 id varchar(30) primary key,
	 name varchar(99) not null,
	 status boolean not null default true,
	 apex_report_id varchar(30) not null
);
alter table apex_report_data add constraint apex_report_data_fk_apex_report_id foreign key (apex_report_id) references apex_report(id);

create table app_menu(
	id varchar(99) primary key,
        name varchar(50) not null,
	menu varchar(50) not null,
	role varchar(30) not null,
        grpcode varchar(9) not null,
	active boolean default true not null,
	priority int not null default 999,
	updated_by varchar(30) default 'system',
	updated_on timestamp default now()
);


create table app_data(
      id varchar(30) primary key,
      name varchar(50) not null,
      code varchar(50) not null,
      active boolean not null default true,
      grpcode varchar(9) not null,
      updated_by varchar(30) not null default 'system',
      updated_on timestamp not null default now()
);
alter table app_data add constraint app_data_uq_name_code_grpcode unique(name, code, grpcode);


create table branch(
        id varchar(30) primary key,
        name varchar(30) not null,
        phone varchar(20),
        mobile varchar(30),
        email varchar(50),
        pan varchar(30),
        tan varchar(30),
        gstin varchar(30),
        lat varchar(99),
        lng varchar(99),
        address varchar(99),
        city varchar(30),
        state varchar(30),
        country varchar(30)not null default 'India',
        zipcode int(8),
        is_main boolean not null default false,
	active boolean not null default true,
	grpcode varchar(9) not null,
	updated_by varchar(30) default 'system',
	updated_on timestamp default now()
);

create table img (
     id varchar(30) primary key,
     name varchar(99) default 'upload',
     src longtext
);

create table address (
    id varchar(30) primary key,
    lane varchar(99),
    city varchar(30),
    state varchar(30),
    country varchar(30) default 'India',
    zipcode int(8)
);



create table profile (
	id varchar(30) primary key,
	name varchar(50) not null default 'Anonymous',
	mobile varchar(15) not null,
	email varchar(99),
	aadhar varchar(99),
	password varchar(30) not null default '1234',
        token varchar(30),
	role varchar(30) not null default 'User',
	address_id varchar(30) not null,
	branch_id varchar(30) not null,
	img_id varchar(30) not null,
	active boolean not null default true,
	grpcode varchar(9) not null,
	created_by varchar(30) not null default 'system',
	created_on timestamp not null default now(),
	updated_by varchar(30) not null default 'system',
	updated_on timestamp not null default now()
);

alter table profile add constraint profile_fk_address_id foreign key (address_id) references address(id);
alter table profile add constraint profile_fk_img_id foreign key (img_id) references img(id);
alter table profile add constraint profile_fk_branch_id foreign key (branch_id) references branch(id);


create table consumer(
    id varchar(30) primary key,
    name varchar(30) not null,
    mobile varchar(20) not null,
    email varchar(99),
    aadhar varchar(20),
    address_id varchar(30) not null,
    active boolean not null default true,
    grpcode varchar(9) not null,
    created_on timestamp not null default now(),
    updated_by varchar(30) not null default 'system',
    updated_on timestamp not null default now()
);
alter table consumer add constraint consumer_fk_address_id foreign key (address_id) references address(id);

