DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM information_schema.columns
                 WHERE table_name='rsvps' AND column_name='guest_names') THEN
        ALTER TABLE rsvps
        ADD COLUMN guest_names text[] DEFAULT '{}';
    END IF;
END $$;
