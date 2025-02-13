from django.db import models

class Holiday(models.Model):
    country = models.CharField(max_length=2)
    year = models.IntegerField()
    name = models.CharField(max_length=255)
    date = models.DateField()
    type = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.country} ({self.year})"
