/*
  # Create actions table
  
  1. New Tables
    - `actions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `completed` (boolean)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS
    - Add policies for CRUD operations
*/

CREATE TABLE actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own actions"
  ON actions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own actions"
  ON actions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own actions"
  ON actions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own actions"
  ON actions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);