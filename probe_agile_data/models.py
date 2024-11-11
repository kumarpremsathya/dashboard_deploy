from django.db import models

             
class rbi_log(models.Model):
    Sr_no = models.AutoField(primary_key=True)
    source_name=models.CharField(max_length=255)
    script_status= models.CharField(max_length=255)
    data_available= models.IntegerField(default=0)
    data_scraped= models.IntegerField(default=0)
    total_record_count = models.IntegerField(default=0) 
    month=models.CharField(max_length=255)
    year=models.CharField(max_length=255)
    file_name= models.CharField(max_length=255)
    failure_reason=models.CharField(max_length=255)
    comments= models.CharField(max_length=255)
    data_updated= models.IntegerField(default=0)
    source_status = models.CharField(max_length=255, default='Active')
    date_of_scraping = models.DateTimeField(null=True, blank=True)
    
    
    class Meta:
        db_table = "rbi_log"


class sebi_log(models.Model):
    Sr_no = models.AutoField(primary_key=True)
    source_name=models.CharField(max_length=255)
    script_status= models.CharField(max_length=255)
    data_available= models.IntegerField(default=0)
    data_scraped= models.IntegerField(default=0)
    total_record_count = models.IntegerField(default=0) 
    failure_reason=models.CharField(max_length=255)
    comments= models.CharField(max_length=255)
    source_status = models.CharField(max_length=255, default='Active')
    date_of_scraping = models.DateTimeField(null=True, blank=True)

    
    
    class Meta:
        db_table = "sebi_log"   
        
        
class mca_log(models.Model):
    Sr_no = models.AutoField(primary_key=True)
    source_name=models.CharField(max_length=255)
    script_status= models.CharField(max_length=255)
    data_available= models.IntegerField(default=0)
    data_scraped= models.IntegerField(default=0)
    total_record_count = models.IntegerField(default=0) 
    failure_reason=models.CharField(max_length=255)
    comments= models.CharField(max_length=255)
    # data_updated= models.IntegerField(default=0)
    source_status = models.CharField(max_length=255, default='Active')
    date_of_scraping = models.DateTimeField(null=True, blank=True)
    
    
    class Meta:
        db_table = "mca_log"   
        
        

class irdai_log(models.Model):
    Sr_no = models.AutoField(primary_key=True)
    source_name=models.CharField(max_length=255)
    script_status= models.CharField(max_length=255)
    data_available= models.IntegerField(default=0)
    data_scraped= models.IntegerField(default=0)
    total_record_count = models.IntegerField(default=0) 
    failure_reason=models.CharField(max_length=255)
    comments= models.CharField(max_length=255)
    # data_updated= models.IntegerField(default=0)
    source_status = models.CharField(max_length=255, default='Active')
    # newly_added_count = models.CharField(max_length=255)
    deleted_source = models.CharField(max_length=255)
    deleted_source_count = models.CharField(max_length=255)
    date_of_scraping = models.DateTimeField(null=True, blank=True)
    
    
    class Meta:
        db_table = "irdai_log"   
        
        
        
class pfrda_log(models.Model):
    Sr_no = models.AutoField(primary_key=True)
    source_name=models.CharField(max_length=255)
    script_status= models.CharField(max_length=255)
    data_available= models.IntegerField(default=0)
    data_scraped= models.IntegerField(default=0)
    total_record_count = models.IntegerField(default=0) 
    failure_reason=models.CharField(max_length=255)
    comments= models.CharField(max_length=255)
    # data_updated= models.IntegerField(default=0)
    source_status = models.CharField(max_length=255, default='Active')
    # newly_added_count = models.CharField(max_length=255)
    deleted_source = models.CharField(max_length=255)
    deleted_source_count = models.CharField(max_length=255)
    date_of_scraping = models.DateTimeField(null=True, blank=True)
    
    
    class Meta:
        db_table = "pfrda_log"  

class cci_log(models.Model):
    Sr_no = models.AutoField(primary_key=True)
    source_name=models.CharField(max_length=255)
    script_status= models.CharField(max_length=255)
    data_available= models.IntegerField(default=0)
    data_scraped= models.IntegerField(default=0)
    total_record_count = models.IntegerField(default=0) 
    failure_reason=models.CharField(max_length=255)
    comments= models.CharField(max_length=255)
    # data_updated= models.IntegerField(default=0)
    source_status = models.CharField(max_length=255, default='Active')
    date_of_scraping = models.DateTimeField(null=True, blank=True)
    
    
    class Meta:
        db_table = "cci_log"     

class nsdl_log(models.Model):
    Sr_no = models.AutoField(primary_key=True)
    source_name = models.CharField(max_length=255)
    script_status = models.CharField(max_length=255)
    data_available = models.IntegerField(default=0)
    data_scraped = models.IntegerField(default=0)
    total_record_count = models.IntegerField(default=0) 
    month = models.CharField(max_length=255)
    year = models.CharField(max_length=255)
    file_name = models.CharField(max_length=255)
    failure_reason =models.CharField(max_length=255)
    comments = models.CharField(max_length=255)
    source_status = models.CharField(max_length=255, default='Active')
    # newly_added_count = models.CharField(max_length=255)
    deleted_source = models.CharField(max_length=255)
    deleted_source_count = models.CharField(max_length=255)
    date_of_scraping = models.DateTimeField(null=True, blank=True)
    
    
    class Meta:
        db_table = "nsdl_log"   

class gem_log(models.Model):
    Sr_no = models.AutoField(primary_key=True)
    source_name = models.CharField(max_length=255)
    script_status = models.CharField(max_length=255)
    data_available = models.IntegerField(default=0)
    data_scraped = models.IntegerField(default=0)
    total_record_count = models.IntegerField(default=0) 
    failure_reason = models.CharField(max_length=255)
    comments = models.CharField(max_length=255)
    source_status = models.CharField(max_length=255, default='Active')
    newly_added_count = models.CharField(max_length=255)
    deleted_source = models.CharField(max_length=255)
    deleted_source_count = models.CharField(max_length=255)
    removal_date = models.CharField(max_length=255)
    date_of_scraping = models.DateTimeField(null=True, blank=True)
    
    
    class Meta:
        db_table = "gem_log"     

class startup_india_log(models.Model):
    Sr_no = models.AutoField(primary_key=True)
    source_name = models.CharField(max_length=255)
    script_status = models.CharField(max_length=255)
    data_available = models.IntegerField(default=0)
    data_scraped = models.IntegerField(default=0)
    total_record_count = models.IntegerField(default=0) 
    failure_reason = models.CharField(max_length=255)
    comments = models.CharField(max_length=255)
    source_status = models.CharField(max_length=255, default='Active')
    newly_added_count = models.CharField(max_length=255)
    deleted_source = models.CharField(max_length=255)
    deleted_source_count = models.CharField(max_length=255)
    removal_date = models.CharField(max_length=255)
    date_of_scraping = models.DateTimeField(null=True, blank=True)
    
    
    class Meta:
        db_table = "startup_india_log"   

class ngo_log(models.Model):
    Sr_no = models.AutoField(primary_key=True)
    source_name = models.CharField(max_length=255)
    script_status = models.CharField(max_length=255)
    data_available = models.IntegerField(default=0)
    data_scraped = models.IntegerField(default=0)
    total_record_count = models.IntegerField(default=0) 
    failure_reason = models.CharField(max_length=255)
    comments = models.CharField(max_length=255)
    source_status = models.CharField(max_length=255, default='Active')
    newly_added_count = models.CharField(max_length=255)
    deleted_source = models.CharField(max_length=255)
    deleted_source_count = models.CharField(max_length=255)
    removal_date = models.CharField(max_length=255)
    date_of_scraping = models.DateTimeField(null=True, blank=True)
    
    
    class Meta:
        db_table = "ngo_log"                           
