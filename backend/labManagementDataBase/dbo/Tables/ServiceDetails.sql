CREATE TABLE [dbo].[ServiceDetails] (
    [ServiceDetailsId]   UNIQUEIDENTIFIER NOT NULL,
    [ServiceDescription] NVARCHAR (500)   NOT NULL,
    [ServiceId]          UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_ServiceDetails] PRIMARY KEY CLUSTERED ([ServiceDetailsId] ASC),
    CONSTRAINT [FK_ServiceDetails_Services_ServiceId] FOREIGN KEY ([ServiceId]) REFERENCES [dbo].[Services] ([ServiceId]) ON DELETE CASCADE
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_ServiceDetails_ServiceId]
    ON [dbo].[ServiceDetails]([ServiceId] ASC);

