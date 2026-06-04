CREATE TABLE [dbo].[Services] (
    [ServiceId]   UNIQUEIDENTIFIER NOT NULL,
    [ServiceName] NVARCHAR (100)   NOT NULL,
    [IsActive]    BIT              NOT NULL,
    CONSTRAINT [PK_Services] PRIMARY KEY CLUSTERED ([ServiceId] ASC)
);

