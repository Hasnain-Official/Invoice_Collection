-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id uuid NOT NULL,
	first_name varchar NULL,
	last_name varchar NULL,
	"role" varchar NULL,
	phone numeric NULL,
	created_at timestamptz NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	"password" varchar NULL,
	CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id)
);

-- public.transactions definition

-- Drop table

-- DROP TABLE public.transactions;

CREATE TABLE public.transactions (
	id uuid NOT NULL,
	"to" uuid NULL,
	"from" varchar NULL,
	transaction_id varchar NULL,
	amount numeric NULL DEFAULT 0,
	transaction_type_uuid uuid NULL,
	transaction_status_uuid uuid NULL,
	created_at timestamptz NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY (id)
);

-- public.wallets definition

-- Drop table

-- DROP TABLE public.wallets;

CREATE TABLE public.wallets (
	id uuid NOT NULL,
	amount numeric NULL DEFAULT 0,
	card_number varchar NULL,
	bank_name varchar NULL,
	ifsc_code varchar NULL,
	user_uuid uuid NULL,
	created_at timestamptz NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now()
);

-- public.transaction_types definition

-- Drop table

-- DROP TABLE public.transaction_types;

CREATE TABLE public.transaction_types (
	id uuid NOT NULL,
	"type" varchar NULL,
	created_at timestamptz NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	CONSTRAINT "PK_2a49fe7879bf8a02812639cea61" PRIMARY KEY (id)
);

-- public.invoices definition

-- Drop table

-- DROP TABLE public.invoices;

CREATE TABLE public.invoices (
	id uuid NOT NULL,
	invoice_number varchar NULL,
	total_amount numeric NULL DEFAULT 0,
	due_date date NULL,
	status_uuid uuid NULL,
	pending_amount numeric NULL DEFAULT 0,
	created_at timestamptz NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY (id)
);