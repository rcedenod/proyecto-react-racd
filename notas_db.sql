PGDMP                  	    |            notas_db    17.0    17.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16387    notas_db    DATABASE     {   CREATE DATABASE notas_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE notas_db;
                     postgres    false            �            1259    16388    notes    TABLE     �   CREATE TABLE public.notes (
    id integer NOT NULL,
    user_id integer,
    title character varying(255),
    content text,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.notes;
       public         heap r       postgres    false            �            1259    16394    notes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.notes_id_seq;
       public               postgres    false    217            �           0    0    notes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;
          public               postgres    false    218            �            1259    16395    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(100)
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16398    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    219                        0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    220            \           2604    16399    notes id    DEFAULT     d   ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);
 7   ALTER TABLE public.notes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217            ^           2604    16400    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219            �          0    16388    notes 
   TABLE DATA           H   COPY public.notes (id, user_id, title, content, updated_at) FROM stdin;
    public               postgres    false    217   X       �          0    16395    users 
   TABLE DATA           7   COPY public.users (id, username, password) FROM stdin;
    public               postgres    false    219   v                  0    0    notes_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.notes_id_seq', 246, true);
          public               postgres    false    218                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 19, true);
          public               postgres    false    220            `           2606    16402    notes notes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_pkey;
       public                 postgres    false    217            b           2606    16404    users pk_users 
   CONSTRAINT     L   ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT pk_users;
       public                 postgres    false    219            c           2606    16405    notes notes_user_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 B   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_user_id_fkey;
       public               postgres    false    217    219    4706            �     x�]�Mk�0��ɯ�+m��V�B��^��'^�U6-��sz�EH��$�i,1��9��5�5l���j
��|)������њPڔ��u^%�h�D�xs�&Qj��xV3^�E��g{�rz�w��$$ᨽ���8��$���h��ĎRp;�/�k��!$?��I��S��֊Nt����ַ�s}����hJ�zF��$��I���4 Y����#�S�[MUg(�PF+�X��8�d�&���b�w�� ���J?�4M �fk      �      x�3��,JNMI��O�44�4����� F�I     