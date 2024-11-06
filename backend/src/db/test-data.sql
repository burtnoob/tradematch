-- First, let's add organizations (1 FI and 3 counterparties)
INSERT INTO organizations (name, org_type) VALUES
('Global Bank Ltd', 'FI'),
('ABC Trading Corp', 'COUNTERPARTY'),
('XYZ Investments', 'COUNTERPARTY'),
('123 Asset Management', 'COUNTERPARTY');

-- Add test users (one FI admin, one FI user, and one user per counterparty)
INSERT INTO users (username, password_hash, email, organization_id, role) VALUES
-- FI users (using a simple hashed version of 'password123' - you should use proper password hashing in production)
('bank_admin', '$2b$10$zPiXsZ4OYE1z9VYtUPYS8.8DT0o63nWXHqXrFWdW1yeNl0lD7Kkqa', 'admin@globalbank.com', 1, 'ADMIN'),
('bank_user', '$2b$10$zPiXsZ4OYE1z9VYtUPYS8.8DT0o63nWXHqXrFWdW1yeNl0lD7Kkqa', 'user@globalbank.com', 1, 'USER'),
-- Counterparty users
('abc_trader', '$2b$10$zPiXsZ4OYE1z9VYtUPYS8.8DT0o63nWXHqXrFWdW1yeNl0lD7Kkqa', 'trader@abctrading.com', 2, 'USER'),
('xyz_trader', '$2b$10$zPiXsZ4OYE1z9VYtUPYS8.8DT0o63nWXHqXrFWdW1yeNl0lD7Kkqa', 'trader@xyzinv.com', 3, 'USER'),
('123_trader', '$2b$10$zPiXsZ4OYE1z9VYtUPYS8.8DT0o63nWXHqXrFWdW1yeNl0lD7Kkqa', 'trader@123am.com', 4, 'USER');

-- Add sample trades with different asset classes, statuses, and counterparties
INSERT INTO trades (
    id, trade_date, asset_class, product_type, notional, 
    currency, status, fi_org_id, counterparty_org_id, 
    created_by, last_modified_by
) VALUES
-- EQD trades
('EQD001', '2024-03-01', 'EQD', 'Equity Swap', 1000000.00, 'USD', 'Pending', 1, 2, 1, 1),
('EQD002', '2024-03-01', 'EQD', 'Option', 500000.00, 'EUR', 'Confirmed', 1, 3, 1, 1),

-- IRD trades
('IRD001', '2024-03-02', 'IRD', 'Interest Rate Swap', 2000000.00, 'USD', 'Confirmed', 1, 2, 1, 1),
('IRD002', '2024-03-02', 'IRD', 'Swaption', 1500000.00, 'GBP', 'Pending', 1, 4, 1, 1),

-- FX trades
('FX001', '2024-03-03', 'FX', 'Forward', 3000000.00, 'EUR', 'Disputed', 1, 3, 1, 1),
('FX002', '2024-03-03', 'FX', 'Option', 2500000.00, 'USD', 'Pending', 1, 2, 1, 1),

-- Securities Services trades
('SS001', '2024-03-04', 'SS', 'Securities Lending', 750000.00, 'USD', 'Confirmed', 1, 4, 1, 1),
('SS002', '2024-03-04', 'SS', 'Custody', 1250000.00, 'EUR', 'Pending', 1, 3, 1, 1),

-- Commodities trades
('COM001', '2024-03-05', 'Commodities', 'Future', 500000.00, 'USD', 'Pending', 1, 2, 1, 1),
('COM002', '2024-03-05', 'Commodities', 'Option', 750000.00, 'USD', 'Confirmed', 1, 4, 1, 1),

-- Credit trades
('CRD001', '2024-03-06', 'Credit', 'CDS', 2000000.00, 'EUR', 'Pending', 1, 3, 1, 1),
('CRD002', '2024-03-06', 'Credit', 'Total Return Swap', 1500000.00, 'USD', 'Confirmed', 1, 2, 1, 1);